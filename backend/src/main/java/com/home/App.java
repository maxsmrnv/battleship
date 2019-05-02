package com.home;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.ServerConnector;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.websocket.jsr356.server.ServerContainer;
import org.eclipse.jetty.websocket.jsr356.server.deploy.WebSocketServerContainerInitializer;

public class App {
    public static void main(String[] args) {
        Server server = new Server();
        ServerConnector serverConnector = new ServerConnector(server);
        serverConnector.setPort(8080);
        server.addConnector(serverConnector);

        ServletContextHandler context = new ServletContextHandler();
        server.setHandler(context);

        try {
            ServerContainer serverContainer = WebSocketServerContainerInitializer.configureContext(context);
            serverContainer.addEndpoint(ChatEndpoint.class);

            server.start();
            server.join();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
