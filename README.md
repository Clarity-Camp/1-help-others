# 1-help-others

### Description
This contract is responsible for giving kudos and/or tips to other users for their contributions.


### Tasks

#### TASK 1: Complete implementation of the function `give-kudos`
As a user if you make a call to this function, you can provide kudos to another user
- [ ] Transfer `PRICE` to the contract owner
- [ ] Update the `kudos` map with the count of kudos received by every recipient

#### TASK 2: Complete implementation of the function `give-kudos-with-tip`
As a user if you make a call to this function, you can provide kudos + additional tip to another user
- [ ] Transfer `PRICE` to the the contract owner
- [ ] Transfer `tip` to the recipient
- [ ] Update the `kudos` map with the count of kudos received by every recipient


## TESTING
Now, the unit tests for the functions in the contract have already been written. You should be able to test the implementation of the functions by running the command in your terminal for this project: `clarinet test`. If all the test cases pass with `ok` response, that means you code works. 
We have not only success scenarios but failure scenarios captured in the unit tests. 
