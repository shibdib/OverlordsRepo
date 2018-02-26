Below if the standardized format for setting up a public segment that lists room needs. We can use this to automate the transfer of boosts/minerals/etc..

```

    let roomNeeds = {
        "W48S28": {
            "modified": Game.time,
            "energy": true,
            "XGH2O": true
        },
        "W51S25": {
            "modified": Game.time,
            "power": true
        },
        "W46S27": {
            "modified": Game.time,
            "G": true,
            "H": true
        },
    }

    if (JSON.stringify(roomNeeds) !== RawMemory.segments[50]) RawMemory.segments[50] = JSON.stringify(roomNeeds);
    RawMemory.setPublicSegments([50]);
    RawMemory.setActiveSegments([50]);
```

The key will be the room requesting the items. The modified propert will be the ingame tick that any changes to your requests were made. Then each property will be the item followed by the boolean true (or false). 

You will then set this as your **[50]** public segment. This is important as having everyone use the same number public segment avoids confusion in any code that caches this info.

The use of this is not required, but if implemented it should make sending and receiving boosts in short notice much easier.
