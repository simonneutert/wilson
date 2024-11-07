# VHS documentation
# https://github.com/charmbracelet/vhs

Output demo.gif

Require echo
Require cd

Set Shell "zsh"
Set FontSize 15
Set Width 1100
Set Height 800


# run the binary
Type "./dist/wilson" Sleep 10ms Enter

# select "strategic"
Sleep 3s
Down
Sleep 2s
Enter
Sleep 2s
Enter

# set story
Sleep 1s
Type@20ms "There's a dragon living in my kingdom, and it's addicted to chocolate. But most importantly, it has to leave for good — fighting is not an option!" Sleep 2s Enter

Sleep 3s
Enter
Sleep 40s
