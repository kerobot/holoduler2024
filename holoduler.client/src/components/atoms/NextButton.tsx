import { FC, memo } from "react";
import { Button } from "@chakra-ui/react";
import { ArrowRightIcon } from "@chakra-ui/icons";

type NextButtonProps = {
    onClick: () => void;
};

// Nextボタンコンポーネント
export const NextButton: FC<NextButtonProps> = memo((props) => {
    const { onClick } = props;

    return (
        <Button
            rightIcon={<ArrowRightIcon />}
            colorScheme='blue'
            variant='solid'
            display="block"
            onClick={onClick}
        >Next</Button>
    );
});
