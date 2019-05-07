package com.home

import javax.persistence.*

@Entity
@Table(name = "GAME")
data class Game(
        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        val id: Long = -1,
        @OrderColumn
        @ElementCollection
        var players: Array<String> = emptyArray()) {


    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as Game

        if (id != other.id) return false
        if (!players.contentEquals(other.players)) return false

        return true
    }

    override fun hashCode(): Int {
        var result = id.hashCode()
        result = 31 * result + players.contentHashCode()
        return result
    }
}
