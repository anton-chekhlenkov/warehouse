databaseChangeLog = {
    changeSet(id: 'initial-dump', author: 'antonch') {
        sqlFile(path: 'dump.sql', stripComments: true)
    }
}
