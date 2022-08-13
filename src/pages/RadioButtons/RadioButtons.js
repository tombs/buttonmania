import "./styles.css";

function RadioGroup(props) {
  return (
    <div className="control-group">
    {props.group.map((menu) => {
      return (
        
        <label className="control control--radio">
          <input
            id={menu.id}
            type="radio"
            value={menu.value}
            name={props.name}
            onChange={props.handleChange}
            disabled={menu.enabled ? !menu.enabled : true}
            checked={menu.selected ? menu.selected : false}
          />
          {menu.value}
          <div className="control__indicator"></div>
        </label>
        
      );
    })}
    </div>
  );
}

export default RadioGroup