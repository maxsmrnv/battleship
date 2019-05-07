package com.home

import com.home.socket.GameSocketHandler
import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.context.annotation.Bean
import org.springframework.http.server.ServerHttpRequest
import org.springframework.http.server.ServerHttpResponse
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer
import org.springframework.web.socket.WebSocketHandler
import org.springframework.web.socket.config.annotation.EnableWebSocket
import org.springframework.web.socket.config.annotation.WebSocketConfigurer
import org.springframework.web.socket.server.HandshakeInterceptor
import org.springframework.web.util.UriComponentsBuilder

@EnableWebSocket
@SpringBootApplication
class App {

    @Bean
    fun gameSocketHandler():GameSocketHandler = GameSocketHandler()

    @Bean
    fun webSocketConfigurer(): WebSocketConfigurer = WebSocketConfigurer { registry ->
        registry.addHandler(gameSocketHandler(), "ws/game").setAllowedOrigins("*")
                .addInterceptors(object : HandshakeInterceptor {
                    override fun beforeHandshake(request: ServerHttpRequest, response: ServerHttpResponse, wsHandler: WebSocketHandler, attributes: MutableMap<String, Any>): Boolean {
                        val queryParams = UriComponentsBuilder.fromHttpRequest(request).build().queryParams
                        queryParams.forEach {attributes[it.key] = it.value[0]}
                        return true
                    }

                    override fun afterHandshake(request: ServerHttpRequest, response: ServerHttpResponse, wsHandler: WebSocketHandler, exception: Exception?) {

                    }
                })
    }

    @Bean
    fun corsConfigurer(): WebMvcConfigurer = object : WebMvcConfigurer {
        override fun addCorsMappings(registry: CorsRegistry) {
            registry.addMapping("/game/**")
                    .allowedOrigins("*")
                    .allowedMethods("GET", "POST", "PATCH", "DELETE")
        }
    }
}

fun main(args: Array<String>) {
    SpringApplication.run(App::class.java)
}
