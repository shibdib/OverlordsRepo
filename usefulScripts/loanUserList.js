"use strict";
// League Of Automated Nations allied users list by Kamots
// Provides global.LOANlist as array of allied usernames. Array is empty if not in an alliance, but still defined.
// Updates on 2nd run and then every 1001 ticks or if the global scope gets cleared.
// Usage: After you require this file, just add this to anywhere in your main loop to run every tick: global.populateLOANlist();
// global.LOANlist will contain an array of usernames after global.populateLOANlist() runs twice in a row (two consecutive ticks).
global.populateLOANlist = function(LOANuser = "LeagueOfAutomatedNations", LOANsegment = 99) {
    if ((typeof RawMemory.setActiveForeignSegment == "function") && !!~['shard0','shard1','shard2'].indexOf(Game.shard.name)) { // For running in sim or private servers without errors
        if ((typeof Memory.lastLOANtime == "undefined") || (typeof global.LOANlist == "undefined")) {
            Memory.lastLOANtime = Game.time - 1001;
            global.LOANlist = [];
        }

        if (Game.time >= (Memory.lastLOANtime+1000)) {
            RawMemory.setActiveForeignSegment(LOANuser, LOANsegment);
        }

        if ((Game.time >= (Memory.lastLOANtime+1001)) && (typeof RawMemory.foreignSegment != "undefined") && (RawMemory.foreignSegment.username == LOANuser) && (RawMemory.foreignSegment.id == LOANsegment)) {
            Memory.lastLOANtime = Game.time;
            if (RawMemory.foreignSegment.data == null) return false;
            else {
                let LOANdata = JSON.parse(RawMemory.foreignSegment.data);
                let LOANdataKeys = Object.keys(LOANdata);
                let allMyRooms = _.filter(Game.rooms, (aRoom) => (typeof aRoom.controller != "undefined") && aRoom.controller.my);
                if (allMyRooms.length == 0) {
                    global.LOANlist = [];
                    return false;
                }
                let myUsername = allMyRooms[0].controller.owner.username;
                for (let iL = (LOANdataKeys.length-1); iL >= 0; iL--) {
                    if (LOANdata[LOANdataKeys[iL]].indexOf(myUsername) >= 0) {
                        global.LOANlist = LOANdata[LOANdataKeys[iL]];
                        return true;
                    }
                }
                return false;
            }
        }
        return true;
    } else {
        global.LOANlist = [];
        return false;
    }
}