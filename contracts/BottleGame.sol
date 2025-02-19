// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;



contract ColorBotleGame {
    uint8 public  constant MAX_ATTEMPTS = 5;
    uint8 public  constant MAX_COLORS = 5;
    mapping(address => uint8) public attempts;

    event Winned(string message);

    function play(uint8[] memory _colors) public returns (uint8) {
        require(_colors.length == MAX_COLORS, "Invalid number of colors");
        require(_colors[0] > 0 && _colors[4] <= 5, "Invalid color");
        require(msg.sender != address(0), "Invalid address");

        if (attempts[msg.sender] >= MAX_ATTEMPTS) {
            attempts[msg.sender] = 0;
        } else {
            attempts[msg.sender]++;
        }

        uint8[5] memory solution = generateColors();
        uint8 correct = 0;

        for (uint8 i = 0; i < MAX_COLORS; i++) {
            if (_colors[i] == solution[i]) {
                correct++;
            }
            else {
                break;
            }
        }
        if (correct == MAX_COLORS) {
            attempts[msg.sender] = 0;
            emit Winned("You win");
            return correct;
            
        }

        return correct;
    }
   
    function generateRandomNumber() public view returns (uint8) {
        return uint8(uint256(keccak256(abi.encodePacked(block.timestamp, block.prevrandao))) % 5 + 1);
    }
    function generateColors() public view returns (uint8[5] memory) {
        uint8[5] memory colors;
        for (uint8 i = 0; i < MAX_COLORS; i++) {
            colors[i] = generateRandomNumber();
        }
        return colors;
    }   
}