import { notification} from "antd";
import "./notification.css"

const openNotificationWithIcon = (type , mes) => {
	  notification[type]({
	  	className: "success-notify",
	    message: mes,
	    duration: 3.5
	  })}

export default openNotificationWithIcon;