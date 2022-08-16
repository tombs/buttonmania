import { useState, useEffect } from "react";
import RadioGroup from "./RadioButtons";

import "./styles.css";

const response = {
  menus: [
    // first group of radio-buttons
    [
      { id: "101", value: "Vegetarian" },
      { id: "102", value: "Nut allergy" },
      { id: "103", value: "Halal" },
    ],
    // second group of radio-buttons
    [
      { id: "201", value: "Cashew chicken" },
      { id: "202", value: "Sweet and sour pork" },
      { id: "203", value: "Stir fried Tofu" },
      { id: "204", value: "Vegetable fried rice" },
      { id: "205", value: "Pad Thai" },
      { id: "206", value: "Massaman beef" },
    ],
    // third group of radio-buttons
    [
      { id: "301", value: "Peanut sauce" },
      { id: "302", value: "Oyster sauce" },
      { id: "303", value: "Vegetable spring rolls" },
      { id: "304", value: "Steamed rice" },
    ],
  ],
  rules: {
    // 'Vegetarian' is NOT compatible with 'Cashew chicken', 'Sweet and sour pork', 'Massaman beef', 'Oyster sauce'
    101: [201, 202, 206, 302],
    // 'Nut allergy' is NOT compatible with 'Cashew chicken', 'Peanut sauce',
    102: [201, 301],
    // 'Halal' is NOT compatible with 'Sweet and sour pork',
    103: [202],
    // 'Vegetable fried rice' is NOT compatible with 'Steamed rice' (you don't need more rice... carb overload),
    204: [304],
    // 'Pad thai' is NOT compatible with 'Steamed rice' (Pad thai comes with noodles),
    205: [304],
  },
};

function RadioButtons(props) {
  const [firstGroup, setFirstgroup] = useState([...response.menus[0]]);
  const [secondGroup, setSecondgroup] = useState([...response.menus[1]]);
  const [thirdGroup, setThirdgroup] = useState([...response.menus[2]]);
  const [firstChoice, setFirstChoice] = useState("");
  const [secondChoice, setSecondChoice] = useState("");
  const [thirdChoice, setThirdChoice] = useState("");

  const [submitEnabled, setSubmitEnabled] = useState(false);

  const rules = response.rules;

  // Enable the first radio group once on page load
  useEffect(() => {
    let tempGroup1 = [...firstGroup];
    let group1 = enableGroup(tempGroup1);
    setFirstgroup(group1);
  }, []);

  // Resets and removes any selection from a particular radio group
  function resetGroupSelection(group) {
    let tempGroup = [...group];
    for (var i = 0; i < tempGroup.length; i++) {
      tempGroup[i].selected = false;
    }
    console.log(group);
    return tempGroup;
  }

  // A radio group that is disabled will be enabled by this function, removing also any selections
  function enableGroup(group) {
    for (var i = 0; i < group.length; i++) {
      group[i].enabled = true;
      group[i].selected = false;
    }
    console.log(group);
    return group;
  }

  // A radio group that is enabled will be disabled by the function, removing also any selections
  function disableGroup(group) {
    for (var i = 0; i < group.length; i++) {
      group[i].enabled = false;
      group[i].selected = false;
    }
    console.log("Disabling group: " + group);
  }

  // This function will disable all items in  a group that is covered by the rules for a single item in another group
  function disableItems(rules, group, itemId) {
    console.log("item ID: " + itemId);
    let itemsToDisable = rules[itemId];
    console.log("items to disable: " + itemsToDisable);
    if (!itemsToDisable) {
      console.log("No incompatible items are for disabling based on the rules");
      return;
    }

    // Iterate through the list of items for disabling for this item based on the rules
    for (var i = 0; i < itemsToDisable.length; i++) {
      // Iterate through the group for any items matching items for disabling
      for (var j = 0; j < group.length; j++) {
        if (group[j].id === itemsToDisable[i].toString()) {
          console.log("Disabling item: " + itemsToDisable[i]);
          group[j].enabled = false;
        }
      }
    }
  }

  // This function updates the 'selected' status of an item in a group, causing it to appear checked in the UI
  function enableItem(group, itemId) {
    for (var i = 0; i < group.length; i++) {
      if (group[i].id === itemId) {
        console.log("Item: " + group[i].value);
        group[i].selected = true;
      }
    }
    return group;
  }

  // This handles all the events when clicking on the first group of radio buttons
  function handleFirstChange(event) {
    console.log("Selected item: " + event.target.value);
    setSubmitEnabled(false); // Disable submit button

    let group = resetGroupSelection(firstGroup); // remove selections from first group
    let updatedGroup = enableItem(group, event.target.id); // make the selected item appear checked
    setFirstgroup(updatedGroup); // Update the first group to properly appear in the UI

    // Disable and reset the 2nd and 3rd group of radio buttons when selecting a new option in the first group
    disableGroup(secondGroup);
    disableGroup(thirdGroup);

    // Enable the second group whenever a member of the first group is selected
    let group2 = enableGroup(secondGroup);

    // Remember the choice in the first group, for disabling other options in the 3rd group later based on the rules
    setFirstChoice(event.target.id);
    disableItems(rules, group2, event.target.id); // Disable the appropriate items in the second group based on the rules
  }

  // This handles all the events when clicking on the second group of radio buttons
  function handleSecondChange(event) {
    console.log("Selected item: " + event.target.value);
    setSubmitEnabled(false); // Disable submit button

    let group = resetGroupSelection(secondGroup); // remove selections from second group

    let updatedGroup = enableItem(group, event.target.id); // make the selected item appear checked
    setSecondgroup(updatedGroup); // Update the second group to properly appear in the UI

    // Enable the third group whenever a member of the second group is selected
    let group3 = enableGroup(thirdGroup);

    // Disable the appropriate items in the first and second group based on the rules
    disableItems(rules, group3, firstChoice);
    disableItems(rules, group3, event.target.id);
    setSecondChoice(event.target.id);
  }

  // This handles all the events when clicking on the third group of radio buttons
  function handleThirdChange(event) {
    console.log("Selected item: " + event.target.value);
    let group = resetGroupSelection(thirdGroup); // remove selections from third group
    let updatedGroup = enableItem(group, event.target.id); // make the selected item appear checked
    setThirdgroup(updatedGroup); // Update the third group to properly appear in the UI
    setSubmitEnabled(true); // Enable submit button as per the requirements\
    setThirdChoice(event.target.id);
  }

  // This function is tied to the reset button, to reset any data and selections from all the groups of radio buttons at any point.
  function resetForm() {
    // Make a copy of all the radio groups, for modifying
    let tempGroup1 = [...firstGroup];
    let tempGroup2 = [...secondGroup];
    let tempGroup3 = [...thirdGroup];

    // Remove all selections from all the groups
    resetGroupSelection(tempGroup1);
    resetGroupSelection(tempGroup2);
    resetGroupSelection(tempGroup3);

    // Disable the 2nd and 3rd group of radio buttons
    disableGroup(tempGroup2);
    disableGroup(tempGroup3);

    // Update all the groups to properly appear in the UI
    setFirstgroup(tempGroup1);
    setSecondgroup(tempGroup2);
    setThirdgroup(tempGroup3);

    // Disable the submit button
    setSubmitEnabled(false);
  }

  // Functionality for clicking on the submit button. Only displays alert (because there is nothing to submit)
  function handleSubmit(event) {
    event.preventDefault();
    //alert("Successfully submitted order!");
    let choice1 = firstGroup.find((obj) => {
      return obj.id === firstChoice;
    });
    let choice2 = secondGroup.find((obj) => {
      return obj.id === secondChoice;
    });
    let choice3 = thirdGroup.find((obj) => {
      return obj.id === thirdChoice;
    });

    alert(
      "Your choices are: " +
        choice1.value +
        ", " +
        choice2.value +
        ", and " +
        choice3.value
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div class="buttonHolder">
        <RadioGroup
          group={firstGroup}
          name="firstgroup"
          handleChange={handleFirstChange}
        />
        <RadioGroup
          group={secondGroup}
          name="secondgroup"
          handleChange={handleSecondChange}
        />
        <RadioGroup
          group={thirdGroup}
          name="thirdgroup"
          handleChange={handleThirdChange}
        />
      </div>
      <div class="buttonHolder">
        <button
          className="form-submit-button "
          type="reset"
          onClick={resetForm}
        >
          {" "}
          Reset
        </button>
        <input
          className="form-submit-button "
          disabled={!submitEnabled}
          type="submit"
          value="Submit"
        />
      </div>
    </form>
  );
}

export default RadioButtons;
