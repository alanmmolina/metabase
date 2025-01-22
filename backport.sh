git reset HEAD~1
rm ./backport.sh
git cherry-pick 7f3816a47a501b116cad6fcff7d123eda27fcff9
echo 'Resolve conflicts and force push this branch'
