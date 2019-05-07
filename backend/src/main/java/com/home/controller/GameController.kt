package com.home.controller

import com.home.Game
import com.home.game.GameManager
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/game")
class GameController {
    @Autowired
    lateinit var gameManager: GameManager

    @PostMapping(produces = [MediaType.APPLICATION_JSON_UTF8_VALUE])
    fun lookUpGame(): Game {
        return gameManager.lookUpGame()
    }

}