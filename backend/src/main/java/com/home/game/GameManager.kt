package com.home.game

import com.home.Game
import com.home.repository.GameRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Component

@Component
class GameManager {
    @Autowired
    lateinit var gameRepository: GameRepository

    fun addPlayerToTheGame(gameId: Long, playersSessionId: String) {
        val game = gameRepository.findByIdOrNull(gameId)
        if(game != null) {
            game.players+=playersSessionId
        }
        gameRepository.saveAndFlush(game)
    }

    fun lookUpGame(): Game {
        val games = gameRepository.findAll()
        var game = games.find { game -> game.players.size == 1 }

        if (game == null) {
            game = createNewGame()
        }
        return game
    }

    fun getPlayersSessionsIdByPlayerInGameSessionId(playerSessionId: String): List<String> =
            gameRepository.findAll().first { game -> game.players.any { sessionId -> playerSessionId == sessionId } }.players.toList()


    private fun createNewGame(): Game{
        val game = Game()
        return gameRepository.saveAndFlush(game)
    }
}