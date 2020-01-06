package com.home.domain.engine;

import com.home.domain.Player;

public class Move {
    private final Player moveOwner;
    private final int coordinates;

    public Move(Player moveOwner, int coordinates) {
        this.moveOwner = moveOwner;
        this.coordinates = coordinates;
    }

    public Player getMoveOwner() {
        return moveOwner;
    }

    public int getIndex() {
        return coordinates;
    }
}
