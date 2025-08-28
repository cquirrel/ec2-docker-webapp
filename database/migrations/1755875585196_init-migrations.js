export const up = (pgm) => {
    pgm.createTable('counter', {
        name: { type: 'serial', notNull: true }
    });
};

export const down = (pgm) => {
    pgm.dropTable('users');
};
