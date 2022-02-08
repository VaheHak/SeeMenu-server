_**SEEMENU.AM**_
`version = 0.1.0`

# FOR DEVELOPING

    $ INSTALL MODULES --> yarn;

    $ MIGRATE --> yarn migrate-dev
                --> for creating database tables;

    $ START --> {
        yarn dev --> with nodemon, for restarting every time
                        when updating;
        yarn start --> default start;
    };

    $ DATABASE --> see_menu.sql;

# FOR PRODUCTION

    $ INSTALL MODULES --> yarn; 

    $ MIGRATE --> yarn migrate 
                --> for creating database tables with .env.production;

    $ START --> {
        yarn prod --> with .env.production;
        yarn start --> default start;
    };
    
    $ DATABASE --> see_menu.sql;
