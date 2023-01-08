import '../style/hive_button.css'

function HiveButton(props){
    var class_name = 'hive_button'
    if(props.active) class_name = 'hive_button active'
    return (
        <div className={class_name}>{props.children}</div>
    )
}

export default HiveButton