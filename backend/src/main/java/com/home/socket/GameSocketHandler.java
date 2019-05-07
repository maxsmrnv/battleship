package com.home.socket;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.home.Message;
import com.home.game.GameManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CopyOnWriteArrayList;

public class GameSocketHandler extends TextWebSocketHandler {
    private List<WebSocketSession> sessions = new CopyOnWriteArrayList<>();
    private Map<String, String> users = new HashMap<>();
    private ObjectMapper mapper = new ObjectMapper();

    @Autowired
    private GameManager gameManager;

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage textMessage) {
        Message message = new Message();
        message.setText(textMessage.getPayload());
        message.setAuthor(users.get(session.getId()));
        broadCast(message, session.getId());
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        if (session.getAttributes().containsKey("name") && session.getAttributes().containsKey("game")) {
            sessions.add(session);

            String userName = session.getAttributes().get("name").toString();
            users.put(session.getId(), userName);

            long game = Long.parseLong(session.getAttributes().get("game").toString());
            gameManager.addPlayerToTheGame(game, session.getId());

            Message message = new Message();
            message.setAuthor(userName);
            message.setText(userName + " connected!");
            broadCast(message, session.getId());
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        sessions.remove(session);
        Message message = new Message();
        String disconnectedUser = users.get(session.getId());
        message.setAuthor(disconnectedUser);
        message.setText(disconnectedUser + " disconnected!");
        broadCast(message, session.getId());
    }

    private void broadCast(Message message, String senderSessionId) {
        List<String> playersInSaneGameAsAuthor = gameManager.getPlayersSessionsIdByPlayerInGameSessionId(senderSessionId);
        sessions.stream()
                .filter(session -> playersInSaneGameAsAuthor.contains(session.getId()))
                .forEach(webSocketSession -> {
                    try {
                        webSocketSession.sendMessage(new TextMessage(mapper.writeValueAsString(message)));
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                });
    }
}
