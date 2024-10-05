import './Inventory.css';

const Inventory = () => {
  return (
    <div className='inventory'>
      <div className='inventory-content default-content'>
        <p>Inventory</p>
        {/* Default content */}
      </div>
      <div className='inventory-content hover-content'>
        <p>Expanded Inventory View</p>
        {/* Content visible on hover */}
      </div>
    </div>
  );
};

export default Inventory;
