import React from "react";
import "antd/dist/antd.css";
import { Input, AutoComplete } from "antd";

const renderTitle = (title) => {
  return <span>{title}</span>;
};

const renderItem = (item) => {
  let name;

  if (item.name == null) {
    name = item.title;
  } else {
    name = item.name;
  }

  return {
    value: name,
    item: item,
    label: (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {name}
        <span>{item.type}</span>
      </div>
    ),
  };
};

const options = (arr) => {
  if (arr !== 0) {
    const array = [];
    arr.map((item) => array.push(renderItem(item)));

    return [
      {
        label: renderTitle("Search results"),
        options: array,
      },
    ];
  } else {
    return [{}];
  }
};

const Complete = (props) => (
  <AutoComplete
    dropdownClassName="certain-category-search-dropdown"
    defaultActiveFirstOption={true}
    dropdownMatchSelectWidth={400}
    id="input"
    options={options(props.arr)}
    onChange={(text) => props.onChange(text)}
    onSelect={(option) => props.onSelect(option)}
  >
    <Input size="large"/>
  </AutoComplete>
);

export default Complete;
