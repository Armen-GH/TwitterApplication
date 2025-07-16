exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('users', {
        id: 'id',
        username: { type: 'varchar(30)', notNull: true, unique: true },
        email: { type: 'varchar(255)', notNull: true, unique: true },
        password_hash: { type: 'varchar(255)', notNull: true },
        created_at: { type: 'timestamptz', default: pgm.func('now()') }
    });

    pgm.createTable('followers', {
        follower_id: {
            type: 'integer',
            references: 'users(id)',
            onDelete: 'cascade'
        },
        followee_id: {
            type: 'integer',
            references: 'users(id)',
            onDelete: 'cascade'
        },
        followed_at: { type: 'timestamptz', default: pgm.func('now()') },
    });
    pgm.addConstraint('followers', 'pk_followers', {
        primaryKey: ['follower_id', 'followee_id']
    });

    pgm.createTable('polls', {
        id: 'id',
        question: { type: 'text', notNull: true },
        creator_id: {
            type: 'integer',
            references: 'users(id)'
        },
        created_at: { type: 'timestamptz', default: pgm.func('now()') }
    });

    pgm.createTable('poll_options', {
        id: 'id',
        poll_id: {
            type: 'integer',
            references: 'polls(id)',
            onDelete: 'cascade'
        },
        option_text: { type: 'text', notNull: true },
        votes: { type: 'integer', default: 0 }
    });
};

exports.down = (pgm) => {
    pgm.dropTable('poll_options');
    pgm.dropTable('polls');
    pgm.dropConstraint('followers', 'pk_followers');
    pgm.dropTable('followers');
    pgm.dropTable('users');
};