#!/bin/bash

echo "🔍 Checking for MySQL dependencies in the project..."

# Check for MySQL dependencies in package.json
echo -e "\n📦 Checking package.json files for MySQL dependencies..."
MYSQL_DEPS=$(grep -r "mysql\|sequelize" --include="package.json" /workspaces/Eureka-blogs)
if [[ -n "$MYSQL_DEPS" ]]; then
    echo "⚠️  Found MySQL dependencies in package.json files:"
    echo "$MYSQL_DEPS"
    echo ""
    
    # Ask to remove dependencies
    read -p "Would you like to remove these dependencies? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        cd /workspaces/Eureka-blogs/backend
        echo "Removing sequelize and mysql2 from backend..."
        npm uninstall --save sequelize mysql2 2>/dev/null
        
        echo "✅ Dependencies removed!"
    fi
else
    echo "✅ No MySQL dependencies found in package.json files."
fi

# Check for MySQL references in code
echo -e "\n📝 Checking for MySQL references in code..."
MYSQL_CODE=$(grep -r "mysql\|sequelize" --include="*.js" --exclude-dir="node_modules" /workspaces/Eureka-blogs)
if [[ -n "$MYSQL_CODE" ]]; then
    echo "⚠️  Found MySQL references in code:"
    echo "$MYSQL_CODE"
    echo ""
    echo "Please review these files manually and update the code to use MongoDB."
else
    echo "✅ No MySQL references found in JavaScript code."
fi

# Check for MySQL files
echo -e "\n🗂️  Checking for MySQL model files..."
MYSQL_FILES=$(find /workspaces/Eureka-blogs -path "*/models/*.js" -not -path "*/models/mongodb/*" -not -path "*/node_modules/*")
if [[ -n "$MYSQL_FILES" ]]; then
    echo "⚠️  Found MySQL model files:"
    echo "$MYSQL_FILES"
    echo ""
    
    # Ask to archive these files
    read -p "Would you like to archive these files with .mysql extension? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        for file in $MYSQL_FILES; do
            mv "$file" "${file}.mysql"
            echo "Archived: ${file} -> ${file}.mysql"
        done
        echo "✅ Files archived!"
    fi
else
    echo "✅ No MySQL model files found."
fi

echo -e "\n🏁 MySQL dependency check complete!"
