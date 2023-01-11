import '../style/hive_button.css'

function HiveButton(props){
    var class_name = 'hive_button'
    if(props.active) class_name = 'hive_button active'
    if(props.className) class_name = class_name + ' ' + props.className
    return (
        <div className={class_name}>{props.children}</div>
    )
}

export default HiveButton