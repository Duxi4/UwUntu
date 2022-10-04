function fish_greeting
	if string match -q "xterm-kitty" $TERM
  		neofetch  --backend kitty --source /home/$USER/.config/neofetch/neofetch-logo.png
	else
  		neofetch
	end
end