import { StyleSheet } from "react-native";
import { theme } from '../../constants/theme';
import ArrowLeft from "./ArrowLeft";
import Bio from "./Bio";
import Camera from "./Camera";
import City from "./City";
import Finder from "./Finder";
import Home from './Home';
import Interests from "./Interests";
import Mail from "./Mail";
import Messages from "./Messages";
import Name from "./Name";
import Password from "./Password";
import Pencil from "./Pencil";
import Profile from "./Profile";
import Settings from "./Settings";

const icons = {
    home: Home,
    arrowLeft: ArrowLeft,
    mail: Mail,
    password: Password,
    name: Name,
    profile: Profile,
    city: City,
    bio: Bio,
    interests: Interests,
    settings: Settings,
    messages: Messages,
    finder: Finder,
    camera: Camera,
    pencil: Pencil,
    
}

const Icon = ({name, ...props}) => {
    const IconComponent = icons[name];
    return (
        <IconComponent
            height={props.size || 24}
            width={props.size || 24}
            strokeWidth={props.strokeWidth || 1.9}
            color={theme.colors.textLight}
            {...props}    
        />
    )
}

export default Icon;

const styles = StyleSheet.create({})