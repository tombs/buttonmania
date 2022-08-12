function RadioGroup(props) {
  return (
    <>
    {props.group.map((menu) => {
      return (
        <label>
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
        </label>
      );
    })}
    </>
  );
}

export default RadioGroup