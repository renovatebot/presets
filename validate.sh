VALIDATE=../../node_modules/.bin/renovate-config-validator
for d in packages/*/
do
    echo $d
    ( cd $d && $VALIDATE )
done
