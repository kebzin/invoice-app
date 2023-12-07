/**
 * React component for displaying and managing a list of items.
 *
 * Summary:
 * This List component allows users to add, delete, and update items in the list.
 * It includes fields for item name, quantity, price, and automatically calculates the total price.
 * Users can dynamically add new items to the list and remove existing ones.
 *
 * @component
 * @param {Array} items - The array of items to be displayed and managed.
 * @param {Function} setItemarray - Function to update the item array state.
 * @param {Object} formstate - State object for managing form state.
 * @returns {JSX.Element} - Rendered List component.
 */
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
  // Function to handle field change in the item array
  const handleFieldChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setItemarray(updatedItems);
  };

  // Function to add a new item to the list
  const addItem = () => {
    setItemarray([...items, { name: "", quantity: "", price: "", total: "" }]);
  };

  // Function to delete an item from the list
  const deleteItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItemarray(updatedItems);
  };

  // Function to calculate the total price of an item
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
