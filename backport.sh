git reset HEAD~1
rm ./backport.sh
git cherry-pick 18e423c8df60e7f108c18eb31c50ca9f64354c6b
echo 'Resolve conflicts and force push this branch'
