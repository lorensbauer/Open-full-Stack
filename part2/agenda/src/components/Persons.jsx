const Persons = ({personsToShow, deletePerson}) => (
  <div>
    {personsToShow.map(person =>
      <div key={person.name}>{person.name} {person.number}
      <button onClick={() => deletePerson(person)} >Delete</button>
      </div>
    )}
  </div>
)

export default Persons