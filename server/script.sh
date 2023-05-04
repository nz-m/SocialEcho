#!/bin/bash

while true; do

  echo "What would you like to do? (Enter the number)"

  echo "1. Create an admin"
  echo "2. Add communities and rules to database"
  echo "3. Add rules to communities"
  echo "4. Add moderators to communities"
  echo "5. Remove moderators from communities"

  echo "Press 'c' to exit or any other key to continue..."


  read choice

  case $choice in
    1) node "scripts/create-admin.js" && read -p "Press Enter to continue, or 'c' to exit..." choice2 && [[ "$choice2" == "c" || "$choice2" == "C" ]] && echo "Exiting..." && exit;;
    2) node "scripts/add-community.js" && read -p "Press Enter to continue, or 'c' to exit..." choice2 && [[ "$choice2" == "c" || "$choice2" == "C" ]] && echo "Exiting..." && exit;;
    3) node "scripts/add-rules.js" && read -p "Press Enter to continue, or 'c' to exit..." choice2 && [[ "$choice2" == "c" || "$choice2" == "C" ]] && echo "Exiting..." && exit;;
    4) node "scripts/add-moderator.js" && read -p "Press Enter to continue, or 'c' to exit..." choice2 && [[ "$choice2" == "c" || "$choice2" == "C" ]] && echo "Exiting..." && exit;;
    5) node "scripts/remove-moderator.js" && read -p "Press Enter to continue, or 'c' to exit..." choice2 && [[ "$choice2" == "c" || "$choice2" == "C" ]] && echo "Exiting..." && exit;;
    c|C) echo "Exiting..."; exit;;
    *) echo "Invalid input, please try again.";;
  esac

done
