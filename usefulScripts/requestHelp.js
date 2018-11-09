/** This is a basic defense request for military support from alliance mates
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

/** This is a basic attack request for military support from alliance mates
 * In order to use it you need to create a attackNeeded array that contains the room names of rooms that you would like attacked.
 * Every 33 ticks this will populate Memory._alliedRoomAttack with an array of allied rooms that need help.
 *
 * THIS REQUIRES YOU TO BE USING THE LOANList GLOBAL CREATION SCRIPT
 *
 **/
// Store your requests for help into segment 23, to use this create an array with the rooms needing assistance called attackNeeded
if (attackNeeded && attackNeeded.length && JSON.stringify(attackNeeded) !== RawMemory.segments[23]) RawMemory.segments[23] = JSON.stringify(attackNeeded);
// Set segment as public/active
RawMemory.setPublicSegments([23]);
RawMemory.setActiveSegments([23]);
// Every 33 ticks check to see if friends need help or not and if they do store them in Memory._alliedRoomAttack in array format
if (Game.time % 33 === 0 && LOANlist && LOANlist.length) {
    let helpRequested;
    let attackArray = Memory._alliedRoomAttack || [];
    for (let user of LOANlist) {
        let allianceUserAttack = RawMemory.setActiveForeignSegment(user, 23);
        if (allianceUserAttack && JSON.parse(allianceUserAttack).length) {
            helpRequested = true;
            JSON.parse(allianceUserAttack).forEach((r) => attackArray.push(r));
        }
    }
    if (helpRequested) Memory._alliedRoomAttack = attackArray; else Memory._alliedRoomAttack = undefined;
}
