package db.implementation;


import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Date;

public class MySqlSimpleOperationsTest extends AbstractDBSimpleOperations {

    private static final String MYSQL_JDBC_DRIVER = "com.mysql.jdbc.Driver";
    private static final String JDBC_MYSQL_HOST = "jdbc:mysql://localhost/";
    private SqlDBSimpleTestConnector connector;
    private String dbUrl;

    @Override
    protected long select() throws Exception {
        Date date = new Date();
        connector.getDbStatement().executeQuery("select * from Client" +
                ";");
        return new Date().getTime() - date.getTime();
    }

    @Override
    protected void createTestTable() throws Exception {
        connector = new SqlDBSimpleTestConnector(MYSQL_JDBC_DRIVER, JDBC_MYSQL_HOST + dbUrl);
        /*connector.getDbStatement().execute("drop table if exists " + TEST_TABLE_NAME + ";");
        connector.getDbStatement().execute("create table if not exists " + TEST_TABLE_NAME +
                " ( col0 INT PRIMARY KEY AUTO_INCREMENT, col1 INT, col2 INT );");         */


    }

    public MySqlSimpleOperationsTest(String dbUrl) {
        this.dbUrl = dbUrl;
    }

    @Override
    public long insert(long operationNum) throws SQLException {
        final PreparedStatement preparedStatementClient = connector.getDbConnection().
                prepareStatement("insert into client (FLM, gender, passportData, familyStatus, work, uid ) values (? , ?, ?,?,?,?)");

        final PreparedStatement preparedStatementBank = connector.getDbConnection().
                prepareStatement(" insert into BankInfo (bankname, dateform, formfio, bankmfo) values (? , ?, ?,?)");

        final PreparedStatement preparedStatementDetail = connector.getDbConnection().
                prepareStatement(" insert into ClientDealDetail (type, dateStart, dateEnd, allAmount, Reference) values (? , ?, ?,?,?)");

        return executeStatement(operationNum, preparedStatementBank, preparedStatementClient, preparedStatementDetail);
    }

    private long executeStatement(long operationNum, PreparedStatement preparedStatementBank,
                                  PreparedStatement preparedStatementClient, final PreparedStatement preparedStatementDetail) throws SQLException {


        Date date = new Date();
        for (int i = 0; i < operationNum; i++) {
            preparedStatementClient.setString(1, "name" + i);
            preparedStatementClient.setString(2, "gender" + i);
            preparedStatementClient.setString(3, "passport" + i);
            preparedStatementClient.setString(4, "family" + i);
            preparedStatementClient.setString(5, "work" + i);
            preparedStatementClient.setInt(6, i);
            preparedStatementClient.executeUpdate();

            preparedStatementBank.setString(1, "name" + i);
            preparedStatementBank.setString(2, "date" + i);
            preparedStatementBank.setString(3, "fio" + i);
            preparedStatementBank.setInt(4, i);

            preparedStatementDetail.setString(1, "type" + i);
            preparedStatementDetail.setString(2, "dateStart" + i);
            preparedStatementDetail.setString(3, "dateEnd" + i);
            preparedStatementDetail.setString(4, "amount" + i);
            preparedStatementDetail.setInt(5, i);

            preparedStatementDetail.executeUpdate();
            preparedStatementBank.executeUpdate();

        }
        return new Date().getTime() - date.getTime();
    }

    @Override
    public long update(long operationNum) throws SQLException {
        final PreparedStatement preparedStatementClient = connector.getDbConnection().
                prepareStatement("update  client set " +
                        "\nFLM= ? , gender = ?, passportData= ?,\n " +
                        "familyStatus = ?, work = ? where uid = ? ");
        final PreparedStatement preparedStatementBank = connector.getDbConnection().
                prepareStatement(" update  BankInfo set BankName = ? , DateForm = ?, FormFIO =? where BankMFO = ?");

        final PreparedStatement preparedStatementDetail = connector.getDbConnection().
                prepareStatement(" update  ClientDealDetail set type=? , dateStart = ?, dateEnd = ?, allAmount = ? where Reference = ?");

        return executeStatement(operationNum, preparedStatementBank, preparedStatementClient, preparedStatementDetail);
    }

    @Override
    public long delete(long operationNum) throws SQLException {
        Date date = new Date();
        connector.getDbStatement().execute("SET foreign_key_checks=0");
        connector.getDbStatement().executeQuery("truncate table deal;");
        connector.getDbStatement().executeQuery("Truncate table BankInfo;");
        connector.getDbStatement().executeQuery("TRUNCATE  table clientdealDetail;");
        connector.getDbStatement().executeQuery("TRUNCATE TABLE client;");
        connector.getDbStatement().execute("SET foreign_key_checks=1;");
        return new Date().getTime() - date.getTime();
    }
}
