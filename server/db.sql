drop database if exists restaurant;

create database restaurant;

use restaurant;

create table user (
	email varchar(64),
	username varchar(128),

	primary key(email),
	key(username)
);

create table restaurants (
	id int ,
	restaurant_name varchar(256),
	image longtext,
	category varchar(256),
	featured boolean,
	label varchar(256),
	order_date date,
	restaurant_description varchar(256)
	
);

create table comments (
	comment_id int,
	rating int not null,
	author varchar(256),
    title varchar(256),
    content varchar(256),
	comment_date date,
	email varchar(64),
    restaurant_id int,

	primary key(comment_id),

	constraint fk_email 
		foreign key(email)
		references user(email)
);

create table contact (
	contact_id int,
	firstname varchar(256),
    lastname varchar(256),
    tel int,
    email varchar(256),
    agree boolean,
    contacttype varchar(256),
    message varchar(256),
    
    primary key(contact_id)
);

create table recipes (
	id int ,
	recipe_name varchar(256),
	image longtext,
	category varchar(256),
	featured boolean,
	label varchar(256),
	order_date date,
	recipe_description varchar(256)
);

insert into user(email, username) values
	('fred@gmail.com', 'fred')
	