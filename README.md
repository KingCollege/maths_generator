# RMaths

RMaths is an API that can generate random maths questions.
Live version:

> https://maths-generator.herokuapp.com/


## TO DO:
- [x] Fix scaling problems with heights
- [x] Change UI design
- [x] Add home page
- [ ] Add application page
- [ ] Add more categories to API
- [ ] Testing

## API

### Simple Fraction Arithmetics (SFA)

> /sfa?pretty&no_ques=${number}&no_oper=${number} 

```
no_ques: number of questions 
no_oper: number of operands
```
### Missing Angle Shape (mas)

> /mas?pretty&no_ques=${number}&no_sides=${number}

```
no_ques: number of questions 
no_sides: number of sides
```