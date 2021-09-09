Basically this stuff goes in segment 98 which needs to be set public/active whatever. It should be an array of objects if done correctly (stringified because it's a segment)

3 types of requests
0 - Resource requests
1 - Defense requests
2 - Attack requests

```// Example resource request
{
   requestType: 0,
   resourceType: boost,
   maxAmount: amountNeeded,
   roomName: roomRequestingResources,
   priority: 0.1
}

// Example defense
{
   requestType: 1,
   roomName: roomRequestingDefenders,
   priority: 0.1
}

// Example attack
{
   requestType: 2,
   roomName: targetRoom,
   priority: 0.1
}
```
I trawl thru requests via the following function. ALLY_HELP_REQUESTS is a global object so I can filter these requests in the applicable modules. FRIENDLIES being an array of friendly names.

```
function logRequests() {
    // Store last tick
    if (RawMemory.foreignSegment && FRIENDLIES.includes(RawMemory.foreignSegment.username) && RawMemory.foreignSegment.id === 98) {
        ALLY_HELP_REQUESTS[RawMemory.foreignSegment.username] = JSON.parse(RawMemory.foreignSegment.data);
    }
    // Lookup and store for review next tick
    let filtered = _.filter(FRIENDLIES, (f) => f !== MY_USERNAME);
    if (filtered.length) {
        try {
            RawMemory.setActiveForeignSegment(filtered[Game.time % filtered.length], 98);
        } catch (e) {
        }
    }
}
```
