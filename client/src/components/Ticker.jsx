import Ticker from "react-ticker"
export const MoveStuffAround = () => (
    <Ticker>
        {({ index }) => (
            <>
                <h1 style={{ paddingRight: "0.5em" }}>
                    This is the Headline of element #{index}!
                </h1>
                <h1 style={{ paddingRight: "0.5em" }}>
                    This is the Headline of element #{index}!
                </h1>
            </>
        )}
    </Ticker>
)