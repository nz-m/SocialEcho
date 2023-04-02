#!/bin/bash

while true; do

  echo "What would you like to do? (Enter the number)"

  echo "1. Add communities and rules to database"
  echo "2. Add moderators to communities"
  echo "3. Add rules to communities"
  echo "4. Remove moderators from communities"

  echo "Press 'c' to exit or any other key to continue..."


  read choice

  case $choice in
    1) node "scripts/addCommunity.js" && read -p "Press Enter to continue, or 'c' to exit..." choice2 && [[ "$choice2" == "c" || "$choice2" == "C" ]] && echo "Exiting..." && exit;;
    2) node "scripts/addMod.js" && read -p "Press Enter to continue, or 'c' to exit..." choice2 && [[ "$choice2" == "c" || "$choice2" == "C" ]] && echo "Exiting..." && exit;;
    3) node "scripts/addRules.js" && read -p "Press Enter to continue, or 'c' to exit..." choice2 && [[ "$choice2" == "c" || "$choice2" == "C" ]] && echo "Exiting..." && exit;;
    4) node "scripts/removeMod.js" && read -p "Press Enter to continue, or 'c' to exit..." choice2 && [[ "$choice2" == "c" || "$choice2" == "C" ]] && echo "Exiting..." && exit;;
    c|C) echo "Exiting..."; exit;;
    *) echo "Invalid input, please try again.";;
  esac
done
