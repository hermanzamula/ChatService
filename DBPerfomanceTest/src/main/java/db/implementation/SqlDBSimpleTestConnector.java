package db.implementation;

import java.sql.*;

public  class SqlDBSimpleTestConnector {

    private Statement dbStatement;
    private Connection dbConnection;

    public SqlDBSimpleTestConnector(String className, String dbConnection) throws ClassNotFoundException, SQLException {
        Class.forName(className);
        this.dbConnection = DriverManager.getConnection(dbConnection, "root", "herakliz");
        this.dbStatement = this.dbConnection.createStatement();
    }

    public Statement getDbStatement() {
        return dbStatement;
    }

    public Connection getDbConnection() {
        return dbConnection;
    }
}
