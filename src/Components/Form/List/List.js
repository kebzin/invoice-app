import Button from "../../shared/Button/Button";
import {
  Fieldset,
  Legend,
  Wrapper,
  InputsGroup,
  InputWrapper,
  Label,
  Input,
  Delete,
  TotalValue,
} from "./ListStyles";
import image from "../../../assets/delete.png";
import allowOnlyNumbers from "../../../utilities/allowOnlyNumbers";

const List = ({ items, setItemarray, formstate }) => {
  //create a copy of the itemarray using the spread operator (...itemarray) to ensure immutability.
  // then update the specific item at the given index by spreading its current properties and updating the specified field with the new value
  const handleFieldChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setItemarray(updatedItems);
  };

  // function to add more field
  const addItem = () => {
    // befor add more check if the previous field in the array have been filled
    setItemarray([...items, { name: "", quantity: "", price: "", total: "" }]);
  };
  // delete item from list
  const deleteItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItemarray(updatedItems);
  };

  // ...

  //  function to calculate the price
  const calculatePrice = (item) => {
    return item.quantity * item.price;
  };

  return (
    <Fieldset>
      <Legend $lg>Item List</Legend>
      <Wrapper>
        {items.map((item, index) => (
          <InputsGroup key={index}>
            <InputWrapper>
              {index === 0 ? <Label htmlFor="name">Item Name</Label> : null}
              <Input
                required={true}
                disabled={formstate.isSubmitting}
                type="text"
                name="name"
                value={item.name}
                onChange={(e) =>
                  handleFieldChange(index, "name", e.target.value)
                }
              />
            </InputWrapper>
            <InputWrapper>
              {index === 0 ? <Label htmlFor="quantity">Qty.</Label> : null}
              <Input
                required={true}
                disabled={formstate.isSubmitting}
                type="text"
                name="quantity"
                value={allowOnlyNumbers(item.quantity)}
                onChange={(e) =>
                  handleFieldChange(index, "quantity", e.target.value)
                }
              />
            </InputWrapper>
            <InputWrapper>
              {index === 0 ? <Label htmlFor="price">Price</Label> : null}
              <Input
                required={true}
                disabled={formstate.isSubmitting}
                type="number"
                name="price"
                value={allowOnlyNumbers(item.price)}
                onChange={(e) =>
                  handleFieldChange(index, "price", e.target.value)
                }
              />
            </InputWrapper>
            <InputWrapper>
              {index === 0 ? <Label>Total</Label> : null}
              <TotalValue>{calculatePrice(item)}</TotalValue>
            </InputWrapper>
            {index === 0 ? null : (
              <Delete
                src={image}
                width={20}
                height={20}
                onClick={() => deleteItem(index)}
              />
            )}
          </InputsGroup>
        ))}

        <Button
          type="button"
          $secondary
          onClick={addItem}
          disabled={formstate.isSubmitting}
        >
          + Add New Item
        </Button>
      </Wrapper>
    </Fieldset>
  );
};

export default List;
