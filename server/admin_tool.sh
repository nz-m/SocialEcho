#!/bin/bash

prompt_exit() {
  read -p "Press Enter to continue, or 'c' to exit..."
  if [[ "$REPLY" == "c" || "$REPLY" == "C" ]]; then
    echo "Exiting..."
    exit
  fi
}

while true; do
  echo "What would you like to do? (Enter the number)"

  echo "1. Create an admin"
  echo "2. Add communities and rules to the database"
  echo "3. Add rules to communities"
  echo "4. Add moderators to communities (also available from the admin panel)"
  echo "5. Remove moderators from communities (also available from the admin panel)"

  echo "Press 'c' and Enter to exit or any other key to continue..."

  read choice

  case $choice in
    1)
      node "scripts/create-admin.js"
      prompt_exit
      ;;
    2)
      node "scripts/add-community.js"
      prompt_exit
      ;;
    3)
      node "scripts/add-rules.js"
      prompt_exit
      ;;
    4)
      node "scripts/add-moderator.js"
      prompt_exit
      ;;
    5)
      node "scripts/remove-moderator.js"
      prompt_exit
      ;;
    c|C)
      echo "Exiting..."
      exit
      ;;
    *)
      echo "Invalid input, please try again."
      ;;
  esac

done
