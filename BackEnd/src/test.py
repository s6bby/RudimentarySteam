class Foo:
    def __init__(self):
        self.nums = {}

    def factory(self, num):
        def decorator(func):
            self.nums[num] = func
            print(f"'{func.__name__}' is assigned to number {num}")
            
            def wrapper(*args, **kwargs):
                print("Wrapper called")
                return func(*args, **kwargs)
            return wrapper
        return decorator
    
    def run(self, num_to_trigger):
        if num_to_trigger in self.nums:
            self.nums[num_to_trigger]()
        else:
            print("404: Number not found!")

bar = Foo()

@bar.factory(1)
def do_thing():
    print("Doing a thing!")

if __name__ == "__main__":
    print("Entering main...")
    do_thing()