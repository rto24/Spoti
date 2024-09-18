import { Button } from '../template/catalyst/button'
import { Dialog, DialogActions, DialogBody, DialogDescription, DialogTitle } from '../template/catalyst/dialog'
import { Field, Label } from '../template/catalyst/fieldset'
import { Input } from '../template/catalyst/input'
import { useState } from 'react'

export function ChangeBuilding({updateBuilding}) {
  let [isOpen, setIsOpen] = useState(false)
  const [buildingName, setBuildingName] = useState('')
  const [buildingAddress, setBuildingAddress] = useState('')


  const handleSubmit = () => {
    // Call the updateBuilding function with the form data
    updateBuilding({ building_name: buildingName, building_address: buildingAddress });
    setIsOpen(false); // Close the dialog
  };

  return (
    <>
      <Button type="button"outline onClick={() => setIsOpen(true)}>
        Change Building
      </Button>
      <Dialog open={isOpen} onClose={setIsOpen}>
        <DialogTitle>Enter your new building address</DialogTitle>
        {/* <DialogDescription>
          The refund will be reflected in the customer’s bank account 2 to 3 business days after processing.
        </DialogDescription> */}
        <DialogBody className="space-y-4">
          <Field>
            <Label>Building Name</Label>
            <Input 
              name="building_name" 
              placeholder="Enter name" 
              onChange={(e) => setBuildingName(e.target.value)}
              />
          </Field>
          <Field>
            <Label>Address</Label>
            <Input 
              name="building_address" 
              placeholder="Enter address" 
              onChange={(e) => setBuildingAddress(e.target.value)}
              />
          </Field>
        </DialogBody>
        <DialogActions>
          <Button plain onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}