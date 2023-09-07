# Employee Tracker < SQL

A command-line application build from scratch to manage a company's employee database, using Node.js, Inquirer, and MySQL.

## Why

Developers frequently have to create interfaces that allow non-developers to easily view and interact with information stored in databases. These interfaces are called **content management systems (CMS)**.

```
Because this application is not deployed, please find a `walkthrough video` 
link that demonstrates its functionality below in Preview section;
```
## User Story

```md
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```

## Preview


The `click` following video to see the application being used from the command line:

[![A video thumbnail shows the command-line employee management application with a play button overlaying the view.](./Assets/12-sql-video-thumbnail.png)](https://2u-20.wistia.com/medias/2lnle7xnpk)

## Important 

Application will require the use of the `Inquirer` package, ensure that you install and use Inquirer version 8.2.4. To do so, use the following command in your project folder: `npm i inquirer@8.2.4`.

* [MySQL2 package](https://www.npmjs.com/package/mysql2) to connect to your MySQL database and perform queries, 

* [Inquirer package](https://www.npmjs.com/package/inquirer/v/8.2.4) to interact with the user via the command line.


Refer to the following image for the `Design of the database schema`:

![Database schema includes tables labeled “employee,” role,” and “department.”](./Assets/12-sql-demo-01.png)

For `more details` regarding above `Design`, see below:

* `department`

    * `id`: `INT PRIMARY KEY`

    * `name`: `VARCHAR(30)` to hold department name

* `role`

    * `id`: `INT PRIMARY KEY`

    * `title`: `VARCHAR(30)` to hold role title

    * `salary`: `DECIMAL` to hold role salary

    * `department_id`: `INT` to hold reference to department role belongs to

* `employee`

    * `id`: `INT PRIMARY KEY`

    * `first_name`: `VARCHAR(30)` to hold employee first name

    * `last_name`: `VARCHAR(30)` to hold employee last name

    * `role_id`: `INT` to hold reference to employee role

    * `manager_id`: `INT` to hold reference to another employee that is the manager of the current employee (`null` if the employee has no manager)

## Resources

* [Inquirer package](https://www.npmjs.com/package/inquirer/v/8.2.4).

 * [MySQL2 package](https://www.npmjs.com/package/mysql2) 

