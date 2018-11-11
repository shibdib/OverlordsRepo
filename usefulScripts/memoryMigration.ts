/**
 * This is memory migration code.
 * 
 * USAGE:
 * - Add Migration:
 *   - Implement migration function then add it to `migrations` variable
 * 
 * - Run Migration:
 *   - Call migrate() with migration function name (such as `migrate('migration_sample')`)
 */

enum MigrationResult {
    DONE      = 'done',
    FAILED    = 'failed',
}
  
function migrate(name: string): MigrationResult {
    if (!name || !migrations[name]) {
        console.log(`Migration.migrate missing name "${name}"`)
        return MigrationResult.FAILED
    }
    
    const result = migrations[name]()
    console.log(`Migrate ${name} ${result}`)
  
    return result
}

const migrations: {[name: string]: () => MigrationResult} = {
    migration_sample,
    // add migration fuction here
}

// ---- Migrations
// add migration function here
function migration_sample(): MigrationResult {
    // do migration here
    return MigrationResult.FAILED
}
  