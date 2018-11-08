/** This is a basic request for military support from alliance mates
 * In order to use it you need to create a helpNeeded array that contains the room names of rooms that need assistance.
 * This currently is meant only for defense and should only be used for attacks that you cannot handle easily (Do no abuse it)
 * Every 33 ticks this will populate Memory._alliedRoomDefense with an array of allied rooms that need help.
 * 
 * THIS REQUIRES YOU TO BE USING THE LOANList GLOBAL CREATION SCRIPT
 * 
 **/
// Store your requests for help into segment 22, to use this create an array with the rooms needing assistance called helpNeeded
if (helpNeeded && helpNeeded.length && JSON.stringify(helpNeeded) !== RawMemory.segments[22]) RawMemory.segments[22] = JSON.stringify(helpNeeded);
// Set segment as public/active
RawMemory.setPublicSegments([22]);
RawMemory.setActiveSegments([22]);
// Every 33 ticks check to see if friends need help or not and if they do store them in Memory._alliedRoomDefense in array format
if (Game.time % 33 === 0 && LOANlist && LOANlist.length) {
    let helpRequested;
    let defenseArray = Memory._alliedRoomDefense || [];
    for (let user of LOANlist) {
        let allianceUserDefend = RawMemory.setActiveForeignSegment(user, 22);
        if (allianceUserDefend && JSON.parse(allianceUserDefend).length) {
            helpRequested = true;
            JSON.parse(allianceUserDefend).forEach((r) => defenseArray.push(r));
        }
    }
    if (helpRequested) Memory._alliedRoomDefense = defenseArray; else Memory._alliedRoomDefense = undefined;
}
