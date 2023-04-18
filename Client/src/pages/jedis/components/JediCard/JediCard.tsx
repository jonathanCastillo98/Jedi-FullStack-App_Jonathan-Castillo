type Props = {
    id: number,
    name: string,
    saberColor: string,
    isApprentice: boolean,
    battleStyle: number
}

const JediCard = ({ id, name, saberColor, battleStyle }: Props) => {
    return (
        <div>
            <header>
                {id}
                {name}
            </header>
            <main>
                {saberColor}
                {battleStyle}
            </main>
        </div>
    )
}
export default JediCard