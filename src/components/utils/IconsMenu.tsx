import { Paper, MenuList, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import { iconsMenu } from "../types/IconsMenu";



export default function IconsMenu(props:iconsMenu){

  return (
    <Paper sx={{ width: 320, maxWidth: '100%' }}>
        <MenuList>
        {props.icons.map((icon,index)=>{
            return(
                <MenuItem>
                <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText> {props.titles[index]} </ListItemText>
        </MenuItem>
            )
        })}
        </MenuList>
    </Paper>
  );
}