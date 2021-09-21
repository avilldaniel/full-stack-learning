// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

/*
    Smart Contract will create some character whose name
    can only be changed after 30 minutes from being set.
    Character is exclusive to user address.
*/

contract createCharacter {
    
    uint32 public unlockTime;
    mapping(address => string) private characters;
    
    enum State { New, Locked, Ready }
    State private state;
    
    // display to front-end that name has been changed
    event nameChanged(string oldName, string newName);

    // display to front-end that name is still locked for (seconds)
    event waitTilRdy();
    
    constructor() {
        state = State.New;
        unlockTime = uint32(block.timestamp) + 1 days;
    }
    
    function setName(string memory _name) public {
        if (state == State.New) {
            characters[msg.sender] = _name;
            setLock();
        }
        else if (state == State.Ready) {
            characters[msg.sender] = _name;
            setLock();
        }
        else if (isLock()) emit waitTilRdy();
    }
    
    function updateName(string memory _name) public {
        require(isLock() == false, "Your name is not ready to be changed or has not been set.");
        state = State.Ready;
        emit nameChanged(characters[msg.sender], _name);
        setName(_name);
    }
    
    function getName() public view returns (string memory){
        return characters[msg.sender];
    }

    function isLock() internal view returns (bool){
        return (uint32(block.timestamp) < unlockTime);
    }

    function setLock() internal {
        state = State.Locked;
        unlockTime = uint32(block.timestamp) + 30 minutes;
    }
}
