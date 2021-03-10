cd /storage/g/fuzzy-chainsaw/iwhale/webapp/main
echo 'git pull'
git pull
echo 'yarn && yarn build'
yarn && yarn build
echo 'cp -rv ./build ./dist'
cp -rv ./build/* ./dist