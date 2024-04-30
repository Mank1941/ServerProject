# ServerProject


## Project Details
Building a Home Server and Web/Phone Applications to run on the server
I am cataloging my summer project in converting an old pc into a server for a home network and also crafting web applications and smartphone applications that will help in day to day tasks that will run through the local serve


### PC Specs
- Model: Aspire AXC600-ES338
- Processor: Intel Core i#-2130, 3.4GHz, 2 Cores
- RAM: 6GB DDR3
- SystemType: 64bit
- Storage: 1TB HDD
- Graphics: Intel HD Graphic

## Setting Up the Server

To set up your server, follow these steps:

1. **Install Node.js**: If not already installed, download and install Node.js from [nodejs.org](https://nodejs.org/).

2. **Clone the Repository**: Clone the ServerProject repository to your local machine:

    ```bash
    git clone https://github.com/your-username/ServerProject.git
    ```

3. **Navigate to Project Directory**: Change your current directory to the cloned ServerProject directory:

    ```bash
    cd ServerProject
    ```

4. **Install Dependencies**: Install the required dependencies by running the following command:

    ```bash
    npm install
    ```

## Setting Up Mongo Database
1. **Connect to MongoDB:**
   - Make sure you have MongoDB installed and running on your system.
   - Open a terminal or command prompt.

2. **Launch the MongoDB Shell:**
   - Type `mongo` in the terminal and press Enter to start the MongoDB shell.

3. **Create the Database:**
   ```bash
   use VinnicomeBoyz
   ```


These instructions will guide you through creating the "VinnicomeBoyz" database and the "GroceryCollection" collection in MongoDB.



## Running the Server

To run the server, follow these steps:

1. **Start the Server**: Run the following command to start the server:

    ```bash
    npm scr/server.mjs [local|host]
    ```

2. **Access the Server**: Once the server is running, you can access it in your web browser at `http://localhost:3000`.


## Additional Instructions

- Make sure to configure any firewall settings to allow incoming connections to the server on port 3000.
- For security reasons, consider using HTTPS and implementing authentication mechanisms for your web applications.
- Refer to the documentation of individual applications for specific usage instructions.

## Attributions
ChatRoom built from [LAN-chat-project](https://github.com/AswinchristoJ/LAN-chat-project/tree/master)

