package com.home;

import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;

@ServerEndpoint(
        value = "/chat/{username}",
        decoders = MessageDecoder.class,
        encoders = MessageEncoder.class)
public class ChatEndpoint {

    private static Set<ChatEndpoint> endpoints = new CopyOnWriteArraySet<>();
    private static Map<String, String> users = new HashMap<>();
    private Session session;

    private static void broadCast(Message message) {
        endpoints.forEach(chatEndpoint -> {
            synchronized (chatEndpoint) {
                try {
                    chatEndpoint.session.getBasicRemote().sendObject(message);
                } catch (IOException | EncodeException e) {
                    e.printStackTrace();
                }
            }
        });
    }

    @OnOpen
    public void onOpen(Session session, @PathParam("username") String username) {
        this.session = session;
        endpoints.add(this);
        users.put(session.getId(), username);

        Message message = new Message();
        message.setFrom(username);
        message.setContent("Connected!");
        broadCast(message);
    }

    @OnMessage
    public void onMessage(Session session, Message message) {
        message.setFrom(users.get(session.getId()));
        broadCast(message);
    }

    @OnClose
    public void onClose(Session session) {

    }

    @OnError
    public void onError(Session session) {
        endpoints.remove(this);
        Message message = new Message();
        message.setFrom(users.get(session.getId()));
        message.setContent("Disconnected!");
    }

}
